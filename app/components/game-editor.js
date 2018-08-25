import Component from '@ember/component';
import createComponentAtom from 'ember-mobiledoc-editor/utils/create-component-atom';

import EMOJI_MAP from '../data/emoji-map';
const EMOJI_KEYS = Object.keys(EMOJI_MAP);
const EMOJI_REPLACEMENT_REGEX = new RegExp(`(${EMOJI_KEYS.join('|')})$`, 'i');

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);
    this._focus();
  },

  atoms: Ember.computed(function() {
    return [
      createComponentAtom('emoji-atom'),
    ];
  }),

  click() {
    this._focus();
  },

  actions: {
    didCreateEditor(editor) {
      this._editor = editor;

      editor.onTextInput({
        match: EMOJI_REPLACEMENT_REGEX,
        run(editor, match) {
          console.log({ match });
          let matchText = match[0];
          let emoji = EMOJI_MAP[matchText.toLowerCase()];

          editor.run(postEditor => {
            let atom = postEditor.builder.createAtom("emoji-atom", emoji);
            postEditor.insertMarkers(editor.range.head, [atom]);
          });
        }
      });
    },
  },

  _focus() {
    document.querySelector('.mobiledoc-editor__editor').focus();
  }
});
