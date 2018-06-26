export class document{
    Key: Text;
    name: Text;
    lastHash: Text;
    comments: Text;
    currentStatus: Text;
    time: Text;
    owner:string[];
    toModerator:string[];
    
    constructor(Key, name, lastHash,comments,currentStatus,time,owner , toModerator){
        this.Key = Key;
        this.name = name;
        this.lastHash = lastHash;
        this.comments =  comments;
        this.currentStatus = currentStatus;
        this.time = time;
        this.owner = owner;
        this.toModerator = toModerator;
       

    }
}