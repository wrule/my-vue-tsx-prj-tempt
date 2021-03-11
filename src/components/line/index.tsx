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
    return this.convert(ethData, 'eth')
      // .concat(this.convert(dentData, 'dent'))
      // .concat(this.convert(btcData, 'btc'))
      // .concat(this.convert(ethData, 'eth'))
      // .concat(this.convert(eosData, 'eos'))
      // .concat(this.convert(linkData, 'link'))
      // .concat(this.convert(dogeData, 'doge'));
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
    this.myfunc();

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
        return v;
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

  private tryLottery(probs: number[]): number {
    let i = 0, count = 1;
    /* eslint-disable no-constant-condition */
    while (true) {
      const prob = probs[i];
      const rnum = Math.random();
      if (rnum <= prob) {
        break;
      }
      i++;
      if (i >= probs.length) {
        i = 0;
      }
      count++;
    }
    return count;
  }

  private testAAA() {
    let list: number[] = [];
    while (
      list.length < 3 ||
      list.some((item) => item !== 0)
    ) {
      list.push(Math.random() < 0.5 ? 0 : 1);
      const diff = list.length - 3;
      if (diff > 0) {
        list = list.slice(diff);
      }
    }
    return Math.random() < 0.5 ? 0 : 1;
  }

  private myfunc() {
    // const max = 100000;
    // const probs = [0.1826, 0.0747, 0.1543];
    // const nums = Array(max).fill(0).map(() => {
    //   return probs.map((prob) => [prob, Math.random()]).some((arys) => arys[0] >= arys[1]);
    // });
    // const trueNums = nums.filter((item) => item).length;
    // console.log(trueNums / nums.length);

    const max = 1000;
    const nums = [0.1826, 0.0747, 0.1543, 0.105, 0.06];
    const counts = Array(max).fill(0).map(() => this.tryLottery(nums));
    counts.forEach((count, index) => {
      console.log(`${index + 1}号用户摇了 ${count} 次摇中`);
    });
    let sum = 0;
    counts.forEach((num) => {
      sum += num;
    });
    console.log(`所有用户平均 ${sum / max} 次摇中`);

    const aaa = Array.from(new Set(counts));
    aaa.sort((a, b) => a - b);
    aaa.forEach((count) => {
      const nums = counts.filter((item) => item === count).length;
      console.log(`第 ${count} 次摇中的人数: ${nums}`);
    });

    console.log( counts.filter((num) => num <= 10).length );
  }

  public render(): VNode {
    return (
      <span class={style.com}>折线图</span>
    );
  }
}
