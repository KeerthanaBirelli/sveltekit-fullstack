//@ts-ignore
import NeucronSDK from "neucron-sdk";

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        const neucron = new NeucronSDK();

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;


        const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
        console.log(loginResponse);

 
        const DefaultWalletBalance = await walletModule.getWalletBalance({});
        console.log(DefaultWalletBalance);


        return { success: true, balance: DefaultWalletBalance.data.balance.summary };
    },
    pay: async ({ request }) => {
        const data = await request.formData();
        const neucron = new NeucronSDK();

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;


        const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
        console.log(loginResponse);

        const paymail = data.get('paymail');
        const amount = Number(data.get('amount'));

        const options = {
            outputs: [
                {
                    address: paymail,
                    note: 'gurudakshina',
                    amount: amount
                }
            ]
        };

        const payResponse = await neucron.pay.txSpend(options)
        console.log(payResponse)

        return { success: true, payment: payResponse.data.txid };

    }
};



// export const actions = {
//     login: async ({ request }) => {
//         const formData = await getFormData(request);
//         const loginResponse = await loginWithEmailAndPassword(formData.email, formData.password);
//         const balance = await getWalletBalance();
//         return { success: true, balance };
//     },
//     pay: async ({ request }) => {
//         const formData = await getFormData(request);
//         //console.log(formData.amount)
//         const neucron = new NeucronSDK();
//         const authModule = neucron.authentication;
//         const walletModule = neucron.wallet;

//         // Authenticate the user
//         const loginResponse = await authModule.login({
//             email: formData.email,
//             password: formData.password,
//         });
//         console.log(loginResponse);

//         // Now you can make the payment
//         const payResponse = await makePayment(
//             formData.paymail,
//             formData.amount,
//             neucron
//         );

//         return { success: true, payment: payResponse.data.txid };
//     },
// };

// async function getFormData(request: Request) {
//     const data = await request.formData();
//     return {
//         email: data.get('email') as string,
//         password: data.get('password') as string,
//         paymail: data.get('paymail') as string,
//         amount: Number(data.get('amount')),
        
//         //amount: data.get('amount') as unknown as number, // Assuming amount is a number
//     };
    
// }

// async function loginWithEmailAndPassword(email: string, password: string) {
//     const neucron = new NeucronSDK();
//     const authModule = neucron.authentication;
//     const loginResponse = await authModule.login({ email, password });
//     console.log(loginResponse);
//     return loginResponse;
// }

// async function getWalletBalance() {
//     const neucron = new NeucronSDK();
//     const walletModule = neucron.wallet;
//     const DefaultWalletBalance = await walletModule.getWalletBalance({});
//     console.log(DefaultWalletBalance);
//     return DefaultWalletBalance.data.balance.summary;
// }


// async function makePayment(
//     paymail: string,
//     amount: number,
//     neucron: NeucronSDK
// ) {
    

//     const options = {
//         outputs: [
//             {
//                 address: paymail,
//                 amount: amount.toFixed(8),
//                 note: "gurudakshina",
//             },
//         ],
      
//     };
//     console.log("Paymail:", paymail);
//     console.log("Amount:", amount);
//     console.log("Options:", options); 
//     const payResponse = await neucron.pay.txSpend(options);
//     console.log(payResponse);
//     return payResponse;
// }