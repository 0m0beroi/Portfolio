import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LightboxProvider, LightboxImage } from '../components/Lightbox';

describe('Lightbox', () => {
  it('renders image and handles click without error', () => {
    const { getByAltText } = render(
      <LightboxProvider>
        <LightboxImage src="/img1.jpg" alt="Sample" caption="Cap" />
      </LightboxProvider>
    );
    const img = getByAltText('Sample');
    img.click();
    expect(img.getAttribute('src')).toBe('/img1.jpg');
  });
});
