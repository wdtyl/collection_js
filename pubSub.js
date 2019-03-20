// 小程序的参数传递
class PubSub {
  constructor(){
    PubSub.PubSubCache = {
      $uid: 0
    }
  };
  on(type,handle){
      let cache = PubSub.PubSubCache[type]||(PubSub.PubSubCache[type]={});
      let handle = handle.$uid||PubSub.PubSubCache.$uid+1;
      cache[handle.$uid]=handle;
  }
  emit(type,...param){
      let cache = PubSub.PubSubCache[type];
      let key,tmp;
      if(!cache){
          return;
      }
      for(key in cache){
          tmp=cache[key];
          tmp.call(this,...param);
      }
  }
  off(type,handle){
      let counter = 0;
      let cache = PubSub.PubSubCache[type];
      if(handle==null){
          if(!cache){
              return true;
          }else{
              !!PubSub.PubSubCache[type]&&(delete PubSub.PubSubCache[type])
          }
      }else{
          !!PubSub.PubSubCache[type]&&(delete PubSub.PubSubCache[type][handle.$uid]);
      }
      for(let key in cache){
          counter++
      }
      return !counter&&(delete PubSub.PubSubCache[type]);
  }
}

Object.defineProperties(PubSub,'PubSub',{
    value:1,
    readable:false,
    writeable:true,
    enumerable:false,
    configurable:false
})

export default new PubSub();