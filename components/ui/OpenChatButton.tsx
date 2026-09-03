'use client';

import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { openChat } from '@/lib/chat';

type Props = {
  children: ReactNode;
} & ComponentProps<typeof Button>;

/**
 * A button that opens the shared chat panel. Drop-in replacement for the old
 * WhatsApp <ButtonLink>s, so it takes the same variant/size/className props.
 */
export default function OpenChatButton({ children, onClick, ...props }: Props) {
  return (
    <Button
      type="button"
      onClick={(event) => {
        openChat();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
