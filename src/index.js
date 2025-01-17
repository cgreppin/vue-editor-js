import { reactive, defineComponent, onMounted, h } from "vue-demi";
import EditorJS from "@editorjs/editorjs";

export const Editor = defineComponent({
  props: {
    holder: {
      type: String,
      default: () => "vue-editor-js",
      require: true,
    },
    config: {
      type: Object,
      default: () => ({}),
      require: true,
    },
    initialized: {
      type: Function,
      default: () => {},
    },
  },
  setup: (props) => {
    const state = reactive({ editor: null });

    function initEditor(props) {
      destroyEditor();
      state.editor = new EditorJS({
        holder: props.holder || "vue-editor-js",
        ...props.config,
      });
      props.initialized(state.editor);
    }

    function destroyEditor() {
      if (state.editor) {
        state.editor.destroy();
        state.editor = null;
      }
    }

    onMounted(() => {
      console.log('on mounted')
      initEditor(props)
    });

    return { props, state };
  },
  render(props) {
    console.log('render')
    return h(
        'div',
        {
          id: props.holder
        },
    )
  }
});

export default {
  install (Vue) {
    Vue.component('Editor', Editor)
  }
}
