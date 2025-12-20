// import ImageUploader from '@/components/jsm/experimental/image.uploader';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

function useOutsideClick(
  ref: RefObject<HTMLDivElement | null>,
  handler: (event: any) => void,
) {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Re-run if ref or handler changes
}

export const ToolbarButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      className={cn(
        'jsm-editor-button rounded-sm p-1',
        isActive
          ? 'jsm-editor-button-active bg-slate-100 text-slate-800'
          : 'jsm-editor-button-inactive text-slate-500',
      )}
      tabIndex={-1} // Prevents focus on the trigger button
    >
      {children}
    </button>
  );
};

export const ColorButton: React.FC<{
  value: string;
  onChange: (value: string) => void;
  children?: (value: string) => React.ReactNode;
}> = ({ children, value, onChange }) => {
  const [color, setColor] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popoverRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    const debouncedSetColor = debounce(() => {
      setColor(value);
    }, 200);

    debouncedSetColor();

    return () => {
      debouncedSetColor.cancel();
    };
  }, [value]);

  const handleColorChange = useCallback(
    (color: string) => {
      setColor(color);
      onChange(color);
    },
    [onChange],
  );

  return (
    <>
      <Popover open={isOpen}>
        <PopoverTrigger
          onClick={() => setIsOpen(true)}
          tabIndex={-1} // Prevents focus on the trigger button
        >
          {children ? (
            children(color)
          ) : (
            <span
              className="block border-slate-100 border rounded-sm w-7 h-7"
              style={{ backgroundColor: value || '#222' }}
            ></span>
          )}
        </PopoverTrigger>
        <PopoverContent ref={popoverRef} className="w-fit">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </PopoverContent>
      </Popover>
    </>
  );
};
