import 'styled-components/native';
import type { lightTheme } from '../resources/themes/light';

type AppTheme = typeof lightTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
