# CrowdCare

CrowdCare is a decentralized community support platform built on Ethereum that enables transparent, community-driven fundraising and support distribution.

## Features

- 🌟 **Decentralized Fundraising**: Create and manage fundraising requests on the blockchain
- 🤝 **Community Voting**: Democratic decision-making through community voting
- 💰 **Transparent Donations**: Track all donations and fund distributions on-chain
- 🔒 **Secure Authentication**: Web3 wallet-based authentication
- 🎯 **Smart Contract Integration**: Fully automated fund distribution and voting
- 📱 **Responsive Design**: Mobile-first UI built with Next.js and Tailwind CSS
- 🔔 **Real-time Notifications**: Push notifications for important updates
- 📊 **Analytics Dashboard**: Track platform metrics and community engagement
- 🤝 **Referral System**: Community growth through referral rewards
- ⚖️ **Dispute Resolution**: Fair and transparent dispute handling

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Smart Contracts**: Solidity, Hardhat
- **Authentication**: WalletConnect
- **Database**: Supabase
- **Blockchain Data**: The Graph
- **Notifications**: Firebase Cloud Messaging
- **Monitoring**: Sentry
- **Rate Limiting**: Upstash Redis
- **Email**: Resend
- **Analytics**: Vercel Analytics

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```plaintext
# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

# Smart Contract
NEXT_PUBLIC_CONTRACT_ADDRESS=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# The Graph
NEXT_PUBLIC_GRAPH_API_URL=

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=

# Sentry
NEXT_PUBLIC_SENTRY_DSN=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Resend
RESEND_API_KEY=
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crowdcare.git
cd crowdcare
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Smart Contract Deployment

1. Configure your network in `hardhat.config.ts`

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.ts --network <your-network>
```

3. Update the contract address in your environment variables

## Testing

### Frontend Tests
```bash
npm run test
# or
yarn test
```

### Smart Contract Tests
```bash
npx hardhat test
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub

2. Import your repository to Vercel

3. Configure environment variables in Vercel project settings

4. Deploy!

## Project Structure

```
crowdcare/
├── app/                    # Next.js app directory
├── components/            # React components
├── contracts/            # Solidity smart contracts
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── public/              # Static files
├── styles/             # Global styles
├── tests/              # Test files
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the UI components
- [WalletConnect](https://walletconnect.com/) for wallet integration
- [The Graph](https://thegraph.com) for blockchain data indexing
- [Vercel](https://vercel.com) for hosting and deployment

## Support

For support, please open an issue in the GitHub repository or join our [Discord community](https://discord.gg/crowdcare).
