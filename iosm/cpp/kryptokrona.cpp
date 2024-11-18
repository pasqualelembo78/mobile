
// Copyright (c) 2012-2017, The CryptoNote developers, The Bytecoin developers
// Copyright (c) 2018-2019, The TurtleCoin Developers
// Copyright (c) 2019-2024, The Kryptokrona Developers
//
// Please see the included LICENSE file for more information.

#include "crypto.h"
#include "TurtleCoin.h"
#include "StringTools.h"

/* IOS functions for export to Obj C module */

std::vector<std::tuple<Crypto::PublicKey, TransactionInput>> processBlockOutputsIOS(
    WalletBlockInfo walletBlockInfo,
    Crypto::SecretKey privateViewKey,
    std::unordered_map<Crypto::PublicKey, Crypto::SecretKey> spendKeys,
    bool isViewWallet,
    bool processCoinbaseTransactions)
{
    // Convert values from Hex -> pod here or in .mm module?

    const auto inputs = processBlockOutputs(
        walletBlockInfo, privateViewKey, spendKeys, isViewWallet,
        processCoinbaseTransactions);

    // TODO** convert pubkeys and txinput to strings etc
    return inputs;
}

std::string cn_fast_hash(const std::string input)
{
    Crypto::Hash hash = Crypto::Hash();

    Crypto::BinaryArray data = toBinaryArray(input);

    Crypto::cn_fast_hash(data.data(), data.size(), hash);

    return Common::podToHex(hash);
}

bool generateRingSignaturesIOS(
    const std::string prefixHash,
    const std::string keyImage,
    const std::vector<std::string> publicKeys,
    const std::string transactionSecretKey,
    const uint64_t realOutput,
    std::vector<std::string> &signatures)
{
    Crypto::Hash l_prefixHash = Crypto::Hash();

    Common::podFromHex(prefixHash, l_prefixHash);

    Crypto::KeyImage l_keyImage = Crypto::KeyImage();

    Common::podFromHex(keyImage, l_keyImage);

    std::vector<Crypto::PublicKey> l_publicKeys;

    toTypedVector(publicKeys, l_publicKeys);

    Crypto::SecretKey l_transactionSecretKey;

    Common::podFromHex(transactionSecretKey, l_transactionSecretKey);

    std::vector<Crypto::Signature> l_signatures;

    bool success = Crypto::crypto_ops::generateRingSignatures(
        l_prefixHash, l_keyImage, l_publicKeys, l_transactionSecretKey, realOutput, l_signatures);

    if (success)
    {
        toStringVector(l_signatures, signatures);
    }

    return success;
}

bool checkRingSignatureIOS(
    const std::string prefixHash,
    const std::string keyImage,
    const std::vector<std::string> publicKeys,
    const std::vector<std::string> signatures)
{
    Crypto::Hash l_prefixHash = Crypto::Hash();

    Common::podFromHex(prefixHash, l_prefixHash);

    Crypto::KeyImage l_keyImage = Crypto::KeyImage();

    Common::podFromHex(keyImage, l_keyImage);

    std::vector<Crypto::PublicKey> l_publicKeys;

    toTypedVector(publicKeys, l_publicKeys);

    std::vector<Crypto::Signature> l_signatures;

    toTypedVector(signatures, l_signatures);

    return Crypto::crypto_ops::checkRingSignature(l_prefixHash, l_keyImage, l_publicKeys, l_signatures);
}

bool generateKeyDerivationIOS(
    const std::string publicKey,
    const std::string privateKey,
    std::string &derivation)
{
    Crypto::PublicKey l_publicKey = Crypto::PublicKey();

    Common::podFromHex(publicKey, l_publicKey);

    Crypto::SecretKey l_privateKey = Crypto::SecretKey();

    Common::podFromHex(privateKey, l_privateKey);

    Crypto::KeyDerivation l_derivation = Crypto::KeyDerivation();

    bool success = Crypto::generate_key_derivation(l_publicKey, l_privateKey, l_derivation);

    if (success)
    {
        derivation = Common::podToHex(l_derivation);
    }

    return success;
}
std::string generateKeyImageIOS(const std::string publicKey, const std::string privateKey)
{
    Crypto::PublicKey l_publicKey = Crypto::PublicKey();

    Common::podFromHex(publicKey, l_publicKey);

    Crypto::SecretKey l_privateKey = Crypto::SecretKey();

    Common::podFromHex(privateKey, l_privateKey);

    Crypto::KeyImage l_keyImage = Crypto::KeyImage();

    Crypto::generate_key_image(l_publicKey, l_privateKey, l_keyImage);

    return Common::podToHex(l_keyImage);
}
std::string Cryptography::deriveSecretKeyIOS(
    const std::string &derivation,
    const uint64_t outputIndex,
    const std::string &privateKey)
{
    Crypto::KeyDerivation l_derivation = Crypto::KeyDerivation();

    Common::podFromHex(derivation, l_derivation);

    Crypto::SecretKey l_privateKey = Crypto::SecretKey();

    Common::podFromHex(privateKey, l_privateKey);

    Crypto::SecretKey l_derivedKey = Crypto::SecretKey();

    Crypto::derive_secret_key(l_derivation, outputIndex, l_privateKey, l_derivedKey);

    return Common::podToHex(l_derivedKey);
}

inline int
derivePublicKeyIOS(const char *derivation, const uint64_t outputIndex, const char *publicKey, char *&outPublicKey)
{
    std::string l_outPublicKey;

    bool success = Crypto::derive_public_key(derivation, outputIndex, publicKey, l_outPublicKey);

    outPublicKey = strdup(l_outPublicKey.c_str());

    return success;
}

std::vector<std::tuple<Crypto::PublicKey, TransactionInput>> processBlockOutputs(
    const WalletBlockInfo &block,
    const Crypto::SecretKey &privateViewKey,
    const std::unordered_map<Crypto::PublicKey, Crypto::SecretKey> &spendKeys,
    const bool isViewWallet,
    const bool processCoinbaseTransactions)
{

    std::vector<std::tuple<Crypto::PublicKey, TransactionInput>> inputs;

    /* Process the coinbase tx if we're not skipping them for speed */
    if (processCoinbaseTransactions && block.coinbaseTransaction)
    {
        processTransactionOutputs(
            *block.coinbaseTransaction, privateViewKey, spendKeys, isViewWallet, inputs);
    }

    /* Process the normal txs */
    for (const auto &tx : block.transactions)
    {
        processTransactionOutputs(
            tx, privateViewKey, spendKeys, isViewWallet, inputs);
    }

    return inputs;
}

void processTransactionOutputs(
    const RawTransaction &tx,
    const Crypto::SecretKey &privateViewKey,
    const std::unordered_map<Crypto::PublicKey, Crypto::SecretKey> &spendKeys,
    const bool isViewWallet,
    std::vector<std::tuple<Crypto::PublicKey, TransactionInput>> &inputs)
{
    Crypto::KeyDerivation derivation;

    /* Generate the key derivation from the random tx public key, and our private
       view key */
    Crypto::generate_key_derivation(
        tx.transactionPublicKey, privateViewKey, derivation);

    uint32_t outputIndex = 0;

    for (const auto &output : tx.keyOutputs)
    {
        Crypto::PublicKey derivedSpendKey;

        /* Derive the public spend key from the transaction, using the previous
           derivation */
        Crypto::underive_public_key(
            derivation, outputIndex, output.key, derivedSpendKey);

        /* See if the derived spend key matches any of our spend keys */
        const auto ourPrivateSpendKey = spendKeys.find(derivedSpendKey);

        /* If it does, the transaction belongs to us */
        if (ourPrivateSpendKey != spendKeys.end())
        {
            TransactionInput input;

            input.amount = output.amount;
            input.transactionIndex = outputIndex;
            input.globalOutputIndex = output.globalIndex;
            input.key = output.key;
            input.parentTransactionHash = tx.hash;

            if (!isViewWallet)
            {
                /* Make a temporary key pair */
                Crypto::PublicKey tmpPublicKey;
                Crypto::SecretKey tmpSecretKey;

                /* Get the tmp public key from the derivation, the index,
                   and our public spend key */
                Crypto::derive_public_key(
                    derivation, outputIndex, derivedSpendKey, tmpPublicKey);

                /* Get the tmp private key from the derivation, the index,
                   and our private spend key */
                Crypto::derive_secret_key(
                    derivation, outputIndex, ourPrivateSpendKey->second, tmpSecretKey);

                /* Get the key image from the tmp public and private key */
                Crypto::generate_key_image(
                    tmpPublicKey, tmpSecretKey, input.keyImage);
            }

            inputs.emplace_back(derivedSpendKey, input);
        }

        outputIndex++;
    }
}