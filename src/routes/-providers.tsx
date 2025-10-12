import { SplitScreenProvider } from "@/context/split-screen"

interface Props {
    children: React.ReactNode
}

function Providers({ children }: Props) {
    return <SplitScreenProvider>{children}</SplitScreenProvider>
}

export default Providers
