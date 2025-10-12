// @ts-expect-error
import "@fontsource-variable/nunito" // @ts-expect-error
import "@fontsource-variable/inter"

import { TanStackDevtools } from "@tanstack/react-devtools"
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

import appCss from "../styles.css?url"
import Providers from "./-providers"

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: "TanStack Start Starter" },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),

    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full">
            <head>
                <HeadContent />
            </head>

            <body className="h-full">
                <Providers>{children}</Providers>

                <TanStackDevtools
                    config={{ position: "bottom-right" }}
                    plugins={[
                        {
                            name: "Tanstack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                    ]}
                />
                <Scripts />
            </body>
        </html>
    )
}
