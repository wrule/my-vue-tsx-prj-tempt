import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';

@Component
export default class XCMEditor extends Vue {
  @Prop({ default: '' }) private readonly text!: string;

  private codeMirror!: CodeMirror.EditorFromTextArea;

  @Watch('text')
  private handleTextChange(nv: string) {
    this.setValue(nv);
  }

  private setValue(nv: string) {
    this.codeMirror.setValue(nv);
    this.emitInput(nv);
  }

  private innerText = '';

  @Emit('input')
  private emitInput(nv: string) {
    return nv;
  }

  private mounted() {
    const textarea = this.$el.querySelector('textarea');
    if (textarea) {
      this.codeMirror = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'text/typescript',
      } as any);
      this.setValue(this.text)
      this.codeMirror.on('change', (codeMirror) => {
        this.emitInput(codeMirror.getValue());
      });
    }
  }

  public render(): VNode {
    return (
      <div class={style.com}>
        <textarea v-model={this.innerText} />
      </div>
    );
  }
}
