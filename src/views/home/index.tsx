import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';
import XCodeEditor from '@/components/codeEditor';
import Shuji from '@wrule/shuji';
import XTsApiHelper from '@/components/tsApiHelper';

@Component
export default class ViewHome extends Vue {

  private jsonCode = `
{
  "name": "jimao",
  "sex": true,
  "age": 99,
  "address": "浙江省杭州市",
  "tags": ["程序员", "跑步", "看书"],
  "tuple": [
    ["m1", 1],
    ["m2", 2],
    ["m3", 3]
  ],
  "meta": {
    "color": "red",
    "lang": ["js", "ts", "c/c++", "go", "c#"]
  },
  "unknow": []
}`.trim();
  private tsName = '';
  private tsCode = '';
  private shuji = new Shuji();

  private handleJsonChange(nv: string) {
    const struct = this.shuji.Infer('myclass', JSON.parse(nv));
    this.tsName = struct.TsName;
    this.tsCode = struct.TsTestCode;
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <XTsApiHelper />
        {/* <a-row>
          <a-col span={12}>
            <XCodeEditor
              class={style.code}
              lang="json"
              v-model={this.jsonCode}
              onChange={this.handleJsonChange}
            />
          </a-col>
          <a-col span={12}>
            <XCodeEditor
              class={style.code}
              lang="typescript"
              v-model={this.tsCode}
            />
          </a-col>
        </a-row> */}
      </div>
    );
  }
}
