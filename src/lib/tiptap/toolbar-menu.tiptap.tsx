'use client';

import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Editor } from '@tiptap/react';
import { useTranslations } from 'next-intl';
import { BiParagraph } from 'react-icons/bi';
import { IoMdColorFill } from 'react-icons/io';
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
  LuImage,
  LuItalic,
  LuList,
  LuListOrdered,
  LuQuote,
  LuRedo,
  LuStrikethrough,
  LuUnderline,
  LuUndo
} from 'react-icons/lu';
import { MdFormatColorText } from 'react-icons/md';
import {
  ColorButton,
  // ImageButton, 
  ToolbarButton
} from './shared';

type TControl =
  | 'headings'
  | 'textStyle'
  | 'color'
  | 'insertImage'
  | 'list'
  | 'code'
  | 'align'
  | 'undo'
  | 'blockquote';

const isControlActive = (
  controls: TControl[] | undefined,
  control: TControl,
) => {
  return !controls?.length || controls.includes(control);
};

type Props = {
  editor: Editor | null;
  content: string;
  controls?: TControl[];
  className?: string;
};

const Toolbar = ({ editor, controls, className }: Props) => {
  const t = useTranslations('Editor');
  if (!editor) {
    return null;
  }
  return (
    <div className={cn("flex flex-wrap justify-between items-start gap-5 px-3 py-2 border border-text-200 rounded-tl-md rounded-tr-md w-full", className)}>
      <div className="flex flex-wrap grow justify-start items-center gap-3 lg:w-10/12">
        {isControlActive(controls, 'headings') && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {editor.isActive('heading', { level: 2 }) ? (
                  <LuHeading2 className="size-5" />
                ) : editor.isActive('heading', { level: 3 }) ? (
                  <LuHeading3 className="size-5" />
                ) : editor.isActive('heading', { level: 4 }) ? (
                  <LuHeading4 className="size-5" />
                ) : editor.isActive('heading', { level: 5 }) ? (
                  <LuHeading5 className="size-5" />
                ) : editor.isActive('heading', { level: 6 }) ? (
                  <LuHeading6 className="size-5" />
                ) : (
                  <BiParagraph className="size-5" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className={cn(
                    'py-1 px-3 rounded-md flex items-center cursor-pointer gap-3',
                  )}
                  onClick={() => editor.commands.setNode('paragraph')}
                >
                  <BiParagraph className="size-5" />
                  <span className="d">{t(`Paragraph`)}</span>
                </DropdownMenuItem>
                {[2, 3, 4, 5, 6].map((level) => (
                  <DropdownMenuItem
                    key={level}
                    className={cn(
                      'py-1 px-3 rounded-md flex items-center cursor-pointer gap-3',
                      editor.isActive('heading', { level }) && 'bg-slate-50',
                    )}
                    onClick={(_e) =>
                      editor
                        .chain()
                        .focus()
                        .toggleNode('paragraph', 'heading', { level })
                        .run()
                    }
                  >
                    {level === 2 ? (
                      <LuHeading2 className="size-5" />
                    ) : level === 3 ? (
                      <LuHeading3 className="size-5" />
                    ) : level === 4 ? (
                      <LuHeading4 className="size-5" />
                    ) : level === 5 ? (
                      <LuHeading5 className="size-5" />
                    ) : level === 6 ? (
                      <LuHeading6 className="size-5" />
                    ) : null}

                    <span className="d">{t(`Heading ${level}`)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {isControlActive(controls, 'textStyle') && (
          <>
            <ColorButton
              onChange={(value) => {
                // const selection = editor.state.selection;

                editor.chain().focus().setColor(value).run();
                // Reaccount the selection
                // editor.view.dispatch(editor.view.state.tr.setSelection(selection));
              }}
              value={editor.getAttributes('textStyle').color}
            >
              {(color) => (
                <span
                  className="flex flex-col justify-center items-center rounded-sm w-7 h-7"
                  style={{ color: color || '#222' }}
                >
                  <MdFormatColorText className="size-5" />
                </span>
              )}
            </ColorButton>
            <ColorButton
              onChange={(value) => {
                editor.chain().focus().toggleHighlight({ color: value }).run();
              }}
              value={editor.getAttributes('highlight').color}
            >
              {(color) => (
                <span
                  className="flex flex-col justify-center items-center rounded-sm w-7 h-7"
                  style={{ color: color || '#222' }}
                >
                  <IoMdColorFill className="size-5" />
                </span>
              )}
            </ColorButton>
          </>
        )}
        {isControlActive(controls, 'textStyle') && (
          <>
            <ToolbarButton
              onClick={() => {
                editor.chain().focus().toggleMark('bold').run();
              }}
              isActive={editor.isActive('bold')}
            >
              <LuBold className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                editor.chain().focus().toggleMark('italic').run();
              }}
              isActive={editor.isActive('italic')}
            >
              <LuItalic className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                (editor as any).chain().focus().toggleUnderline().run();
              }}
              isActive={editor.isActive('underline')}
            >
              <LuUnderline className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                editor.chain().focus().toggleMark('strike').run();
              }}
              isActive={editor.isActive('strike')}
            >
              <LuStrikethrough className="size-5" />
            </ToolbarButton>
          </>
        )}

        {isControlActive(controls, 'blockquote') && (
          <>
            <ToolbarButton
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleList('bulletList', 'listItem')
                  .run();
              }}
              isActive={editor.isActive('bulletList')}
            >
              <LuList className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleList('orderedList', 'listItem')
                  .run();
              }}
              isActive={editor.isActive('orderedList')}
            >
              <LuListOrdered className="size-5" />
            </ToolbarButton>
          </>
        )}
        {isControlActive(controls, 'blockquote') && (
          <>
            <ToolbarButton
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleNode('blockquote', 'paragraph')
                  .run();
              }}
              isActive={editor.isActive('blockquote')}
            >
              <LuQuote className="size-5" />
            </ToolbarButton>
          </>
        )}
        {/* {isControlActive(controls, 'code') && (
          <>
            <ToolbarButton
              onClick={() => {
                editor.chain().focus().setCode().run();
              }}
              isActive={editor.isActive('code')}
            >
              <LuCode className="size-5" />
            </ToolbarButton>
          </>
        )} */}

        {/* -- */}
        {isControlActive(controls, 'align') && (
          <>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
            >
              <LuAlignLeft className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              isActive={editor.isActive({ textAlign: 'center' })}
            >
              <LuAlignCenter className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
            >
              <LuAlignRight className="size-5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign('justify').run()
              }
              isActive={editor.isActive({ textAlign: 'justify' })}
            >
              <LuAlignJustify className="size-5 rtl:scale-x-[-1]" />
            </ToolbarButton>
          </>
        )}
        {/* -- */}
        {isControlActive(controls, 'insertImage') && (
          <>
            <LuImage className="size-5 rtl:scale-x-[-1]" />
            {/* <ImageButton
              onChange={(value) => {
                if (value?.url)
                  (editor as any).chain().focus().setImage({ src: value?.url, alt: value?.id || undefined }).run();
              }}
            >
              <LuImage className="size-5 rtl:scale-x-[-1]" />
            </ImageButton> */}
          </>
        )}
        {/* -- */}
        {isControlActive(controls, 'undo') && (
          <>
            <ToolbarButton
              onClick={() => {
                (editor.chain().focus() as any).undo().run();
              }}
              isActive={editor.isActive('undo')}
            >
              <LuUndo className="size-5 rtl:scale-x-[-1]" />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => {
                (editor.chain().focus() as any).redo().run();
              }}
              isActive={editor.isActive('redo')}
            >
              <LuRedo className="size-5 rtl:scale-x-[-1]" />
            </ToolbarButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
