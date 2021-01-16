import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';

@Component
export default class XCMEditor extends Vue {
  @Prop({ default: '' }) private readonly value!: string;

  private codeMirror!: CodeMirror.EditorFromTextArea;

  @Watch('value', { immediate: true })
  private handleValueChange(nv: string) {
    this.text = nv;
  }

  private text = '';

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
        // cursorHeight: 1,
        // singleCursorHeightPerLine: true,
      } as any);
      this.codeMirror.on('change', (codeMirror) => {
        this.emitInput(codeMirror.getValue());
      });
    }
  }

  public render(): VNode {
    return (
      <div class={style.com}>
        <textarea v-model={this.text} />
      </div>
    );
  }
}
