import React from 'react'
import {View} from 'react-native'
import {Svg, Rect, G, Text} from 'react-native-svg'
import AbstractChart from './abstract-chart'

const barWidth = 32

class BarChart extends AbstractChart {
  renderBars = config => {
    const {data, width, height, paddingTop, paddingRight, chartHeight} = config
    const baseHeight = this.calcBaseHeight(data, chartHeight)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, chartHeight)
      const barWidth = 32
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          width={barWidth}
          height={(Math.abs(barHeight) / 4) * 3}
          fill="url(#fillShadowGradient)"
        />
      )
    })
  }

  renderBarTops = config => {
    const {data, width, height, paddingTop, paddingRight, chartHeight} = config
    const baseHeight = this.calcBaseHeight(data, chartHeight)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, chartHeight)
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />
      )
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = 80
    const { 
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      yLabelsOffset = 12,
    } = this.props
    const {borderRadius = 0} = style
    // Two horizontal boxes take up some space which isn't included in the chart height.
    const yTitleAreaHeight = 50;
    const xTitleAreaHeight = 50;
    const chartHeight = height - yTitleAreaHeight - xTitleAreaHeight;
    const config = {
      width,
      height,
      chartHeight,
    }
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            <Text
              key={Math.random()}
              x={paddingRight}
              textAnchor="end"
              y={paddingTop + 10}
              width="100%"
              style={this.props.style.textStyle}
            >
              Distance
            </Text>
            <Text
              key={Math.random()}
              x={paddingRight}
              textAnchor="end"
              y={paddingTop + 30}
              width="100%"
              style={this.props.style.textStyle}
            >
              (Miles)
            </Text>
          </G>
          <G y={yTitleAreaHeight}>
            {this.renderHorizontalLines({
              ...config,
              count: 4,
              paddingTop
            })}
          </G>
          <G y={yTitleAreaHeight}>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
              ...config,
              count: 4,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })
            : null}
          </G>
          <G y={yTitleAreaHeight}>
            {withVerticalLabels
              ? this.renderVerticalLabels({
              ...config,
              labels: data.labels,
              paddingRight,
              paddingTop,
              horizontalOffset: barWidth
            })
            : null}
          </G>
          <G y={yTitleAreaHeight}>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          <G y={yTitleAreaHeight}>
            {this.renderBarTops({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          <Text
              key={Math.random()}
              x={width / 2}
              y={yTitleAreaHeight + chartHeight + paddingTop + 20}
              textAnchor="center"
              style={this.props.style.textStyle}
            >
              Date
            </Text>
        </Svg>
      </View>
    )
  }
}

export default BarChart
