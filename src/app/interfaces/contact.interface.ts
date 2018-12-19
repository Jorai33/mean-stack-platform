export default interface Contact {
    userId: string,
    reference: string,
    email: string,
    telephonePrimary?: string,
    telephoneSecondary?: string,
    address: {
        reference?: string,
        line1?: string,
        line2?: string,
        townCity?: string,
        countyState?: string,
        postcode?: string,
        country?: string
    },
    vatNumber?: number
}