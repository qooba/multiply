
Vue.component('train', {
  data: function () {
    return {
      targetType: "green",
      show: true,
      snackbarContainer: document.querySelector('#toast'),
      packages: null,
      intervalId: null,
      fx: [],
      subclipStart: null,
      subclipEnd: null,
      loader: false,
      v1: 1,
      v2: 1,
      text: "1 x 1",
      result: 1,
      exists: false,
      checked: [],
      is_end: false,
    }
  },
  props: {
    currentProject: null
  },
  methods: {
    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    randomInt(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    reload() {
        v1 = this.randomInt(2,10);
        v2 = this.randomInt(2,10);

        this.exists=false;

        //console.log(this.checked.length);
        
        if(this.checked.length >= 37){
            this.text = "KONIEC";
            this.is_end=true;
            return;
        }

        
        for(var i=0;i<this.checked.length;i++){
            if((this.checked[i][0] == v1 && this.checked[i][1] == v2) || (this.checked[i][1] == v1 && this.checked[i][0] == v2)) {
                this.exists=true;

                this.reload();
                console.log(this.checked[i][0],this.checked[i][1], this.checked.length);
                return;
            }
            
        }

        if(!this.exists) {
            
            this.result = v1*v2;
            this.text = this.result + " : " + v1;
            this.v1=v1;
            this.v2=v2;
        }
    },
    ok(){
        if(this.is_end){
            return;
        }
        this.show_result();
        this.sleep(1000).then(() => {
            if(!this.exists){
                this.checked.push([this.v1,this.v2]);
            }
            this.reload();
        });
    },
    bad(){
        if(this.is_end){
            return;
        }

        this.show_result();
        this.sleep(2000).then(() => {
            this.reload();
        });

    },
    show_result(){
        this.text = this.result + " : " + this.v1 + " = " + this.v2;
    },
  },
  created(){
  },
  updated(){
      if(this.$refs.dropzone !== undefined){
        this.$refs.dropzone.reload(this.currentProject);
      }
  },
  template: `
  <main class="mdl-layout__content mdl-color--grey-100" v-if="show">
  <div class="mdl-grid demo-content">
    <div class="demo-card-square mdl-card mdl-cell mdl-cell--12-col">

<div class="demo-card-event mdl-card mdl-shadow--2dp">

  <div class="mdl-card__title mdl-card--expand">
    <h3>
    <span>{{text}}</span>
    </h3>
  </div>

</div>



            <hr/>
            <input id="ok" type="submit" class="mybtn" v-on:click="ok" >
            <label for="ok" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Dobrze
            </label>
            <br/>
            <input id="bad" type="submit" class="mybtn" v-on:click="bad" >
            <label for="bad" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--accent mdl-js-ripple-effect">
              Źle
            </label>
            <br/>

            <input id="show_result" type="submit" class="mybtn" v-on:click="show_result" >
            <label for="show_result" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Pokaż
            </label>

        </div>
    </div>
    </div>
</main>
  `
});
