import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ToastHost, { useToast } from '../components/ToastHost';

function TestComponent(){
  const { push } = useToast();
  return <button onClick={()=> push('Hello World')}>Push</button>;
}

describe('ToastHost', () => {
  it('pushes and displays a toast', () => {
    const { getByText, findByText } = render(
      <ToastHost>
        <TestComponent />
      </ToastHost>
    );
    const btn = getByText('Push');
    btn.click();
    return findByText(/Hello World/).then((el: HTMLElement) => {
      expect(el.textContent).toContain('Hello World');
    });
  });
});