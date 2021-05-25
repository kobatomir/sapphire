export module Guid{
    /** 新建Guid */
    export function NewGuid(){
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /** 空Guid */
    export const Empty = "00000000-0000-0000-0000-000000000000";

    
}

