## feat: ✨ lesson-6-passing-and-exposing-module-options
```
export interface ModuleOptions {
  dropConsole: boolean;
  nitroCompressPublicAssets: boolean;
  nitroMinify: boolean;
  disableUseAsyncDataDeep: boolean;
}
```
dropConsole 등의 설정은 production 모드에서 동작합니다.  
하여 빌드하고 preview 를 통해서 결과를 확인할 수 있습니다.  
local dev server 에서는 기능이 반영되지 않습니다.  

```
cd playground
pnpm dlx nuxi build && pnpm dlx nuxi preview
```
