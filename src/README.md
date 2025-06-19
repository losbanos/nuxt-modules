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

## Passing and Exposing Module Options
### 차이점 설명:
1. basicOptimizer: {...} (모듈 옵션):
- 빌드 타임에 적용됨
- pnpm dev에서도 즉시 적용
- Vite/esbuild 설정이 실시간으로 반영

2. runtimeConfig.public.basicOptimizer: {...} (런타임 설정):
- 런타임에만 접근 가능
- 빌드 최적화에는 영향을 주지 않음
- 클라이언트에서 접근 가능한 설정

**현재 코드에서 runtimeConfig 설정은 단순히 설정값을 저장하고 보여주는 기능만 있습니다.**
