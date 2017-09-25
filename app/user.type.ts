/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 import {User} from './user';

export class UserType {
    public type:number;
    constructor(
        role: number,
        public typeName: string,
        public users: User[]
    ) {
        this.type = role;
    }
}
