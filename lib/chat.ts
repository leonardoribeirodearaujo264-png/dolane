/**
 * The whole site opens one shared chat panel (rendered once by ChatWidget).
 * Any button anywhere asks for it by dispatching this event, so triggers can
 * live inside server components without threading state through the tree.
 */
export const CHAT_OPEN_EVENT = 'dolane:open-chat';

export function openChat() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}
