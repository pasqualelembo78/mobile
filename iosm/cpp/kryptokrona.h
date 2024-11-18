#include "Types.h"

#include <unordered_map>

std::vector<std::tuple<Crypto::PublicKey, TransactionInput>> processBlockOutputs(
    const WalletBlockInfo &block,
    const Crypto::SecretKey &privateViewKey,
    const std::unordered_map<Crypto::PublicKey, Crypto::SecretKey> &spendKeys,
    const bool isViewWallet,
    const bool processCoinbaseTransactions);

void processTransactionOutputs(
    const RawTransaction &tx,
    const Crypto::SecretKey &privateViewKey,
    const std::unordered_map<Crypto::PublicKey, Crypto::SecretKey> &spendKeys,
    const bool isViewWallet,
    std::vector<std::tuple<Crypto::PublicKey, TransactionInput>> &inputs);

bool generateRingSignaturesIOS(
    const std::string prefixHash,
    const std::string keyImage,
    const std::vector<std::string> publicKeys,
    const std::string transactionSecretKey,
    const uint64_t realOutput,
    std::vector<std::string> &signatures);

bool checkRingSignatureIOS(
    const std::string prefixHash,
    const std::string keyImage,
    const std::vector<std::string> publicKeys,
    const std::vector<std::string> signatures);

bool generateKeyDerivationIOS(
    const std::string publicKey,
    const std::string privateKey,
    std::string &derivation);
std::string generateKeyImageIOS(const std::string publicKey, const std::string privateKey);

std::string Cryptography::deriveSecretKeyIOS(
    const std::string &derivation,
    const uint64_t outputIndex,
    const std::string &privateKey);
inline int
derivePublicKeyIOS(const char *derivation, const uint64_t outputIndex, const char *publicKey, char *&outPublicKey)

    std::string cn_fast_hash(const std::string input)