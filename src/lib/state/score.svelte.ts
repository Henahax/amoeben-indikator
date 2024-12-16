let score = $state(0)

export const scorer = {
    get score(){
        return score;
    },
    set score(value){
        score = value;
    }
}