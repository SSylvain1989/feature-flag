import LaunchDarkly from "launchdarkly-node-server-sdk"

let launchDarklyClient

async function initialize() {
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY)
  await client.waitForInitialization()
  return client
}
// eslint-disable-next-line import/prefer-default-export
export async function getClient() {
  if (launchDarklyClient) return launchDarklyClient
  // eslint-disable-next-line no-return-assign
  return (launchDarklyClient = await initialize())
}

export async function ldVariation(key) {
  const client = await getClient()
  return client.variation(key, { key: "anonymous" })
}

export const FeatureFlag = {
  usePromo: "ENABLE_PROMO",
}

export async function enablePromo() {
  const usePromo = await ldVariation(FeatureFlag.usePromo, false)
  return usePromo
}
