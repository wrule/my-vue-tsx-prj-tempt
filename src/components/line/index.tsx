import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import { Chart } from '@antv/g2';
import jsonData from './rsp.json';

@Component
export default class XLine extends Vue {

  private chart: Chart = null as any;

  private dataSource: any[] = JSON.parse(`[${jsonData.value}]`);

  private get autoDataSource() {
    return this.dataSource.map((item) => ({
      time: item[0],
      price: item[1],
    }));
  }

  private mounted() {

    console.log(this.autoDataSource);

    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    
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
    this.chart.line().position('time*price');
    
    // Step 4: 渲染图表
    this.chart.render();
  }

  public render(): VNode {
    return (
      <span class={style.com}>折线图</span>
    );
  }
}
