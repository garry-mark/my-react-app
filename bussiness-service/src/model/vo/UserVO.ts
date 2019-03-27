export default interface UserVO {
    id?: number;
    username: string;
    password: string;
    password2: string;
    telNum?: string;
    role?: number;
    email?: string;
    avatar?: string;
    createTime?: string;
    updateTime?: string;
}