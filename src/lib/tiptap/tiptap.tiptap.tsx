'use client';

import { cn } from '@/lib/utils';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import { useEffect } from 'react';

// Import optimized extensions instead of StarterKit
import { advancedEditorExtensions } from './tiptap-optimized';

import BubbleMenu from './bubble-menu.tiptap';
// import FloatingMenu from './floating-menu.tiptap';
import Toolbar from './toolbar-menu.tiptap';

type Props = {
  onChange: ({
    content,
    json,
  }: {
    content: string;
    json: Record<string, any>;
  }) => void;
  content: string;
  defaultContent: string;
  toolbarMenu?: boolean;
  floatingMenu?: boolean;
  bubbleMenu?: boolean;
  style?: React.CSSProperties;
  toolbarClassName?: string;
  contentClassName?: string;
};

const Tiptap: React.FC<Props> = ({
  onChange,
  content,
  defaultContent = '',
  toolbarMenu = true,
  floatingMenu,
  bubbleMenu,
  style,
  toolbarClassName,
  contentClassName,
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      ...advancedEditorExtensions,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
      attributes: {
        class:
          'px-4 py-3 justify-start border-b border-r min-h-[400px] border-l border-foreground-200 text-foreground items-start w-full font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    onUpdate: ({ editor }) => {
      onChange({
        content: editor.getHTML(),
        json: editor.getJSON(),
      });
    },
    content: content || '',
  });

  // useEffect(() => {
  //   if (editor && !editor.isFocused) {
  //     editor.commands.setContent(defaultContent);
  //   }
  // }, [defaultContent, editor]);

  useEffect(() => {
    if (editor && !editor.isFocused) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(defaultContent, {
        // emitUpdate: false,
        parseOptions: {
          preserveWhitespace: 'full',
        }
      });
      editor.commands.setTextSelection({ from, to });
    }
  }, [defaultContent, editor]);

  return (
    <div className="w-full relative">
      {toolbarMenu && <Toolbar editor={editor} content={content} className={toolbarClassName} />}
      {/* {floatingMenu && <FloatingMenu editor={editor} content={content} />} */}
      {bubbleMenu && <BubbleMenu editor={editor} content={content} />}
      <div className={cn("prose-p:mt-0 max-w-none prose", contentClassName)}>
        <EditorContent
          style={{
            ...style,
            whiteSpace: 'pre-line',
          }}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default Tiptap;
