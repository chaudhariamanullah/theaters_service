export interface AddTheaterInput {
    theater_public_id:string,
    theater_name:string,
    theater_image?:string | undefined,
    theater_country:string,
    theater_city:string,
    theater_address:string,
    theater_status:string
}