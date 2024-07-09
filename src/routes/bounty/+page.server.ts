import { Root } from '../../contracts/root'
import { DefaultProvider, bsv} from 'scrypt-ts'
import { NeucronSigner } from 'neucron-signer'
import artifact from "../../../artifacts/root.json"



const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
const signer = new NeucronSigner(provider);

await signer.login('sales@timechainlabs.io', 'string');
await Root.loadArtifact(artifact);
let instance: any;


 /** @type {import('./$types').Actions} */
export const actions = {

    deploy: async ({ request }) => {


        const data = await request.formData();


        const square = BigInt(data.get('square'))
        instance = new Root(square)
        await instance.connect(signer)

        const deployTx = await instance.deploy(Number(data.get('bounty')))
        console.log(
            'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
        )

        return { success: true, txid: deployTx.id };
    },
    unlock: async ({ request }) => {
        await signer.login('sales@timechainlabs.io', 'string')
        await Root.loadArtifact()
        const data = await request.formData();
        const root = BigInt(data.get('root'))
        const { tx: callTx } = await instance.methods.unlock(root)
        console.log(
            'contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
        )
        return { deployed: true, txid: callTx.id };
    }

}
