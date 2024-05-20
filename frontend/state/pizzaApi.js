import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pizzaApi = createApi({
    reducerPath: "pizzaApi",
    baseQuery: fetchBaseQuery ({baseUrl: "http://localhost:9009/api/pizza/" }),
    tagTypes: ["pizza"],
    endpoints: build => ({
        getHistory: build.query ({
            query: () => "history",
            providesTags: ["pizza"]
        }),
        createOrder: build.mutation ({
            query: order => ({
                url: "order",
                method: "POST",
                body: order
            }),
            invalidatesTags: ["pizza"]
        })
    })
})

export const {
    useGetHistoryQuery,
    useCreateOrderMutation
} = pizzaApi