'use client';

import { type Editor } from '@tiptap/react';
import {  FloatingMenu as TipTapFloatingMenu } from '@tiptap/react/menus';
import {
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
  LuList,
  LuListOrdered,
  LuQuote,
} from 'react-icons/lu';
import { ToolbarButton } from './shared';

type Props = {
  editor: Editor | null;
  content: string;
};

const FloatingMenu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <TipTapFloatingMenu
      className="floating-menu bg-white"
      // tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <div className="flex border-slate-100 bg-white p-1 border rounded-sm">
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleNode('heading', 'paragraph', { level: 2 })
              .run();
          }}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <LuHeading2 className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleNode('heading', 'paragraph', { level: 3 })
              .run();
          }}
          isActive={editor.isActive('heading', { level: 3 })}
        >
          <LuHeading3 className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleNode('heading', 'paragraph', { level: 4 })
              .run();
          }}
          isActive={editor.isActive('heading', { level: 4 })}
        >
          <LuHeading4 className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleNode('heading', 'paragraph', { level: 5 })
              .run();
          }}
          isActive={editor.isActive('heading', { level: 5 })}
        >
          <LuHeading5 className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleNode('heading', 'paragraph', { level: 6 })
              .run();
          }}
          isActive={editor.isActive('heading', { level: 6 })}
        >
          <LuHeading6 className="w-5 h-5" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleList('bulletList', 'listItem').run();
          }}
          isActive={editor.isActive('bulletList')}
        >
          <LuList className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleList('orderedList', 'listItem').run();
          }}
          isActive={editor.isActive('orderedList')}
        >
          <LuListOrdered className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleNode('blockquote', 'paragraph').run();
          }}
          isActive={editor.isActive('blockquote')}
        >
          <LuQuote className="w-5 h-5" />
        </ToolbarButton>
      </div>
    </TipTapFloatingMenu>
  );
};

export default FloatingMenu;
