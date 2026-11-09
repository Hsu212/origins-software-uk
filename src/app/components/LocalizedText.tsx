'use client';

import { translate } from '@/app/i18n';
import { useLocale } from './LocaleProvider';
import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

export default function LocalizedText({ text }: { text: string }) {
  return translate(useLocale(), text);
}

function translateNode(locale: ReturnType<typeof useLocale>, node: ReactNode): ReactNode {
  if (typeof node === 'string') return translate(locale, node);
  if (Array.isArray(node)) return node.map((child) => translateNode(locale, child));
  if (!isValidElement<{ children?: ReactNode }>(node)) return node;
  return cloneElement(node, undefined, translateNode(locale, node.props.children));
}

export function LocalizedContent({ children }: { children: ReactNode }) {
  return translateNode(useLocale(), children);
}
