import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';
import XCMEditor from '@/components/cmeditor';

@Component
export default class ViewHome extends Vue {
  private text = `
private mounted() {
  const textarea = this.$el.querySelector('textarea');
  if (textarea) {
    this.codeMirror = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      matchBrackets: true,
      mode: 'text/typescript'
    } as any);
  }
}`.trim();

  private mounted() {
    // setInterval(() => {
    //   this.text += '\nconsole.log(1);';
    // }, 1000);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <img src={logo} />
        <br />
        <span>这是我的主页</span>
        <br />
        <XHello />
        <br />
        <div class={style.box}>
          <XCMEditor text={this.text} />
        </div>
      </div>
    );
  }
}
