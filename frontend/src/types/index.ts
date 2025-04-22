export type User = {
    name : string
    email: string
    _id : string
    password : string
    handle: string
    description: string
    image: string
    links : string
    score: number // Puntuación generada en el resultado del quiz
}

// hacer nuevo usuario master para que 

export type Userhandle = Pick<User, 'handle'| 'image'| 'description' | 'links'| 'name'> 

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> &  {
    password: string,
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email' > & {
    password: string,

}

export type ProfileForm = Pick<User, 'handle'  | 'description'> & { 
    //en este type pondre la casa de la app de yasuo
}

export type SocialNetwork= {
    id: number,
    name: string,
    url: string,
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>