import { vi } from 'vitest';

Object.assign(globalThis, {
  IS_REACT_ACT_ENVIRONMENT: true,
});

const SvgComponentStub = () => null;

vi.mock('/src/components/AppHeader/logo.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/copy.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/home.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/loader.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/plus.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/repeat.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/trash.svg?react', () => ({
  default: SvgComponentStub,
}));

vi.mock('/src/components/base/icon/icons/check.svg?react', () => ({
  default: SvgComponentStub,
}));
