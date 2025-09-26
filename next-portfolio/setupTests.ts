// Ensure Vitest provides expect before extending
import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Basic DOM stubs sometimes referenced
if(!(globalThis as any).matchMedia){
	(globalThis as any).matchMedia = () => ({ matches:false, addEventListener(){}, removeEventListener(){}, media:'', onchange:null, addListener(){}, removeListener(){}, dispatchEvent(){ return false; } });
}
