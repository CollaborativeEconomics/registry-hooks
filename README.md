## Todo:

[ ] Handle errors

## Usage

Initialize registry hooks using a registry API key

```jsx
import { init } from '@cfce/registry';

init({
  registryApiKey: process.env.CFCE_REGISTRY_API_KEY,
  registryBaseUrl: 'https://registry.staging.cfce.io/api', // optional, for if you want to use the staging version, which you probably do
});
```

Wherever you want to run a given hook, use the `runHook` function.

```jsx
mintNFT() {
  import {runHook, Triggers} from '@cfce/registry';

  const initialMetadata = {a: 1};
  // runHook takes 3 params. 1. The Trigger name 2. The organizations to check and 3. Additional data that can be used by the the hook (currently just the below)
  const extraMetadata = runHook(Triggers.addMetadataToNFTReceiptReceipt, organizationId, {userId, walletId, organizationId}); // include metadata that might be used by the hooks.
}
```
