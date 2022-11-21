
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
    }
  },
  props: {
    currentProject: null
  },
  methods: {

    randomInt(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    reload() {
        v1 = this.randomInt(2,9);
        v2 = this.randomInt(2,9);

        this.exists=false;
        
        if(this.checked.length >= 36){
            this.text = "KONIEC";
            return;
        }

        for( const e in this.checked){
            if((e[0] == v1 && e[1] == v2) || (e[1] == v1 && e[0] == v2)) {
                this.exists=true;
            }
            
        }

        console.log(this.exists);
        if(!this.exists) {
            this.text = v1+" x "+v2;
            this.result = v1*v2;
            this.v1=v1;
            this.v2=v2;
        }
    },
    ok(){
        if(!this.exists){
            this.checked.push([this.v1,this.v2]);
        }
        this.reload();
    },
    bad(){
        this.reload();
    },
    show_result(){
        this.text = this.v1 + " x " + this.v2 + " = " + this.result;
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
