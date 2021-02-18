import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import { Chart } from '@antv/g2';
import dentData from './data/dent.json';
import adaData from './data/ada.json';
import btcData from './data/btc.json';
import ethData from './data/eth.json';
import eosData from './data/eos.json';
import linkData from './data/link.json';
import dogeData from './data/doge.json';

@Component
export default class XLine extends Vue {

  private chart: Chart = null as any;


  private get autoDataSource() {
    return this.convert(btcData, 'btc')
      .concat(this.convert(dentData, 'dent'))
      .concat(this.convert(btcData, 'btc'))
      .concat(this.convert(ethData, 'eth'))
      .concat(this.convert(eosData, 'eos'))
      .concat(this.convert(linkData, 'link'))
      .concat(this.convert(dogeData, 'doge'));
  }

  private convert(data: any, type: string) {
    const list: any[] = JSON.parse(`[${data.value}]`);
    const itemList = list.map((item) => ({
      type,
      time: item[0],
      price: item[1],
    }));
    const priceMax = Math.max(...itemList.map((item) => item.price));
    const priceMin = Math.min(...itemList.map((item) => item.price));
    const priceLen = priceMax - priceMin;
    return itemList.map((item) => ({
      ...item,
      price: 1000 * ((item.price - priceMin) / priceLen),
    }));
  }

  private mounted() {
    console.log(this.autoDataSource);

    this.chart = new Chart({
      container: this.$el as any, // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300, // 指定图表高度
    });
    this.chart.scale('time', {
      type: 'time',
    });
    this.chart.scale('price', {
      formatter: (v, k) => {
        console.log(v, k);
        return v * 6.5;
      },
    });
    
    // Step 2: 载入数据源
    this.chart.data(this.autoDataSource);
    
    // Step 3: 创建图形语法，绘制柱状图
    // this.chart.interval().position('genre*sold');
    this.chart.line().position('time*price').color('type');
    
    // Step 4: 渲染图表
    this.chart.render();
  }

  public render(): VNode {
    return (
      <span class={style.com}>折线图</span>
    );
  }
}
