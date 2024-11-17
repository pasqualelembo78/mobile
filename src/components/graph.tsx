import React, { useState, useRef } from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, G, Line, Rect, Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import type { Transaction } from '@/types';

type ChartDataPoint = {
  balance: number;
  timestamp: number;
};

type Props = {
  transactions: Transaction[];
};

export const TransactionChart: React.FC<Props> = ({ transactions }) => {
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const chartWidth = Dimensions.get('window').width; // Chart width for calculations

  // Process transactions to generate chart data
  const chartData: ChartDataPoint[] = transactions
    .slice()
    .reverse() // Ensure chronological order
    .reduce<ChartDataPoint[]>((acc, tx) => {
      const previousBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const currentBalance = previousBalance + (tx.amount / 100000); // Divide by 100,000
      return [...acc, { balance: currentBalance, timestamp: tx.time * 1000 }]; // Convert seconds to milliseconds
    }, []);

  const dataValues = chartData.map((d) => d.balance); // Extract balance values for the AreaChart

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        handleTouch(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        handleTouch(evt.nativeEvent.locationX);
      },
      onPanResponderRelease: () => {
        setTooltipIndex(null); // Hide tooltip on touch release
      },
    })
  ).current;

  const handleTouch = (x: number) => {
    const index = Math.round((x / chartWidth) * dataValues.length); // Map touch X coordinate to chart data index
    if (index >= 0 && index < chartData.length) {
      setTooltipIndex(index);
    }
  };

  const Gradient = () => (
    <Defs>
      <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor="white" stopOpacity={0.8} />
        <Stop offset="100%" stopColor="white" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  );

  const Tooltip = ({
    x,
    y,
    index,
  }: {
    x: (val: number) => number;
    y: (val: number) => number;
    index: number;
  }) => {
    if (index === null || index < 0 || index >= chartData.length) return null;

    const { balance, timestamp } = chartData[index];
    const formattedDate = new Date(timestamp).toLocaleString(); // Use corrected timestamp

    return (
      <G x={x(index)} y={y(balance)}>
        {/* Vertical Line */}
        <Line y1="0" y2={200} stroke="gray" strokeWidth={1} />
        {/* Tooltip Box */}
        <G x={-75} y={-50}>
          <Rect width={150} height={40} fill="black" opacity={0.7} rx={5} />
          <Text x={75} y={15} textAnchor="middle" fontSize={12} fill="white">
            {`Balance: ${balance.toFixed(2)}`}
          </Text>
          <Text x={75} y={30} textAnchor="middle" fontSize={10} fill="white">
            {formattedDate}
          </Text>
        </G>
        {/* Marker Circle */}
        <Circle r={5} fill="blue" />
      </G>
    );
  };

  return (
    <View {...panResponder.panHandlers}>
      <AreaChart
        style={{ height: 200, width: chartWidth }}
        data={dataValues}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
        svg={{ fill: 'url(#gradient)' }}
      >
        <Gradient />
        <Grid />
        {tooltipIndex !== null && (
          <Tooltip
            x={(index) => (index * chartWidth) / dataValues.length}
            y={(value) => 200 - (value * 200) / Math.max(...dataValues)}
            index={tooltipIndex}
          />
        )}
      </AreaChart>
    </View>
  );
};

const styles = StyleSheet.create({});
