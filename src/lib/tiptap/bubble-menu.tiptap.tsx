'use client';

import { type Editor } from '@tiptap/react';
import { BubbleMenu as TipTapBubbleMenu, FloatingMenu } from '@tiptap/react/menus'

import { LuBold, LuItalic, LuStrikethrough, LuUnderline } from 'react-icons/lu';
import { ToolbarButton } from './shared';

type Props = {
  editor: Editor | null;
  content: string;
};

const BubbleMenu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <TipTapBubbleMenu
      className="bubble-menu"
      // tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <div className="flex border-slate-100 bg-white p-1 border rounded-sm">
        <ToolbarButton
          onClick={() => {
            // Use toggleMark('bold') if toggleBold is not available
            if (
              typeof (editor.chain().focus() as any).toggleBold === 'function'
            ) {
              (editor.chain().focus() as any).toggleBold().run();
            } else {
              editor.chain().focus().toggleMark('bold').run();
            }
          }}
          isActive={editor.isActive('bold')}
        >
          <LuBold className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleMark('italic').run();
          }}
          isActive={editor.isActive('italic')}
        >
          <LuItalic className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          isActive={editor.isActive('underline')}
        >
          <LuUnderline className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleMark('strike').run();
          }}
          isActive={editor.isActive('strike')}
        >
          <LuStrikethrough className="w-5 h-5" />
        </ToolbarButton>
      </div>
    </TipTapBubbleMenu>
  );
};

export default BubbleMenu;
