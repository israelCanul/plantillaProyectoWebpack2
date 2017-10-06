import React from 'react'
import CardNotification from '../components/helpers/card_notification';

let contTemp;
let clasesShow = "";

//form inputs
var Select = require('react-select');
import { DateField, TransitionView, Calendar,DatePicker } from 'react-date-picker'

//items
import ListItems from './itemTransfer.js';

//helpers
import cookies from '../helpers/cookies.js';
import moment from 'moment';// for time and date format

class Formulario extends React.Component{
  constructor(props){
    super(props);
    //variables inicialies
    this.state= {
        optionsAH : [
             { value: 'RH', label: 'Royal Haciendas' },
             { value: 'RS', label: 'Royal Sands' }
         ],
        optionsPeople : [
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
              { value: '7', label: '7' },
              { value: '8', label: '8' },
              { value: '9', label: '9' },
              { value: '10', label: '10' },
        ],
        transferType : 0,
        roundTripType : true,
        arrivalHotel : '',
        arrivalHotelName : '',
        arrivalHotelpkId : '',
        arrivalHotelClub : false,
        departureHotel: '',
        departureHotelName: '',
        departureHotelpkId : '',
        departureHotelClub : false,
        passengers : '0',
        arrivalDate : '2016-04-24',
        departureDate : '2016-04-24',
        formato : "YYYY-MM-DD",
        minDate : "",
        maxDate : "",
        minDateOut : "",
        maxDateOut : "",
        itemTrans : [],
        loadingData : false,
        isOpenData : true,
        idTransRoundtrip: 0,
        idTransDeparture: 0,
        idTransArrival: 0,
    }
    this.handleToggleR = this.handleToggleR.bind(this);
    this.handleToggleS = this.handleToggleS.bind(this);
    this.selectAH = this.selectAH.bind(this);// function handler to selected arrival hotels
    this.selectDH = this.selectDH.bind(this);// function handler to selected departure hotels
    this.selectPeople = this.selectPeople.bind(this);// function handler to selected people
    this.clear = this.clear.bind(this);
    this.onAddressChanged = this.onAddressChanged.bind(this);

    //datepicker
    this.datefieldIn = this.datefieldIn.bind(this);
    this.datefieldOut = this.datefieldOut.bind(this);

    // show items
    this.openResultsData = this.openResultsData.bind(this);
    this.nextStep = this.nextStep.bind(this);

    this.setValuesForHotelId = this.setValuesForHotelId.bind(this);
  }
  componentDidMount(){
    //pruebas con localStorage
    let localItems = localStorage.getItem('itemsTrans');




    var minDias= moment().add(this.props.maxdays,'days');//  se inicializa de acuerdo al numero de dias pasado
    var fecha2 =  moment().add(this.props.maxdays,'days');// se inicializa de acuerdo al numero de dias pasado
    fecha2 = fecha2.add(1,'days');//  se le agrega un dia al segundo objeto fecha

    // se inicializa la info de las fecha para que se apliquen las restricciones
    this.setState({
        arrivalDate:minDias.format("YYYY-MM-DD"),
        departureDate:fecha2.format("YYYY-MM-DD"),
        minDate:minDias.format("YYYY-MM-DD"),
        minDateOut : fecha2.format("YYYY-MM-DD"),
    });
    // se agrega el id del tipo de tranfer de acuerdo al codigo (dinamico de acuerdo al web service)
    for (var i = 0; i < this.props.idTypeTransfers.length; i++) {
      switch (this.props.idTypeTransfers[i].sTransferTypeCode) {
        case "ARRIVAL":
          this.setState({idTransArrival : this.props.idTypeTransfers[i].pkTransferTypeID});
          if(!this.state.roundTripType){
            this.setState({transferType : this.props.idTypeTransfers[i].pkTransferTypeID});
          }
          break;
        case "DEPARTURE":
          this.setState({idTransDeparture : this.props.idTypeTransfers[i].pkTransferTypeID});
          break;
        case "ROUNDTRIP":
          this.setState({idTransRoundtrip : this.props.idTypeTransfers[i].pkTransferTypeID});
          if(this.state.roundTripType){
            this.setState({transferType : this.props.idTypeTransfers[i].pkTransferTypeID});
          }
          break;
        default:
      }
    }
  }
  handleToggleR(e){// evento que inicializa el estado si se selecciona Roundtrip
      this.setState({
        arrivalHotel:'',
        itemTrans : [],
        loadingData : false,
        isOpenData : false,
        departureHotel:'',
        departureHotelName:'',
        departureHotelpkId:'',
            });
      this.setState({transferType: this.state.idTransRoundtrip});// se establece el id dinamico de tipo roundtrip
      this.setState({roundTripType: true});// componente global en roundtrip
    }
    handleToggleS(e){
      this.setState({
              arrivalHotel:'',
              departureHotel:'',
              itemTrans : [],
              loadingData : false,
              isOpenData : false,
              departureHotel:'',
              departureHotelName:'',
              departureHotelpkId:'',
            });
      this.setState({transferType: this.state.idTransArrival});// se establece el id dinamico de tipo arrival
      this.setState({roundTripType: false});// componente global no en roundtrip
    }
    setValuesForHotelId(){
      var that = this;
      if((this.state.arrivalHotelName=="" && this.state.arrivalHotelpkId=="" && this.state.arrivalHotel!="") || (this.state.departureHotelName=="" && this.state.departureHotelpkId=="" && this.state.departureHotel!="")){
          this.state.optionsAH.map(function(item){

              if(item.value==that.state.arrivalHotel){
                that.setState({arrivalHotel: item.value, arrivalHotelName:item.label, arrivalHotelpkId : item.pkHotelID, arrivalHotelClub : item.ynRRclub });
              }
              if(item.value==that.state.departureHotel){
                that.setState({departureHotel: item.value, departureHotelName:item.label, departureHotelpkId : item.pkHotelID, departureHotelClub : item.ynRRclub });
              }

          });
      }
    }
    // function for selected people
    selectPeople(val){// handler de la aplicacion cuando se selecciona un numero de personas
      var that =this;// contexto de la aplicacion

      if(val==null){// si se selccciona un valor nulo o se borra la informacion directamente sobre el control
        this.setState({ passengers : '0'});// se establece el valor en 0
      }else{//
        this.setState({ passengers : val.value});// se establece el valor seleccionado a travez del control
        var transType = this.state.transferType;
        var pass = val.value;// valor seleccionado del control
        var arrivalHotel = this.state.arrivalHotel;// valor del hotel de llegada
        var departureHotel = this.state.departureHotel;// valor del hotel de salida
        this.setValuesForHotelId();
        if(arrivalHotel!=''){// si la variable tiene informacion o no esta vacia
          this.setState({loadingData : true});// se notifica a la aplicacion que se esta cargando datos
          // se hace peticion de los items al web service
          this.props.eventos(transType,arrivalHotel,departureHotel,pass);

          this.selectedDate.setState({ expanded : true, focused: true});// se solicita al control de fecha abrir el control para que el usuario seleccione un dato
        }else{
          this.selectedHotelA.focus();
          this.selectedHotelA.setState({isOpen:true});
        }
      }
    }
    // function for selected arrival hotel
    selectAH(val){
      var that =this;
      if(val==null){
        //si el valor seleccionado es null se borran los valores del hotel
        this.setState({arrivalHotel: "", arrivalHotelName:"", arrivalHotelpkId : "",arrivalHotelClub : false ,itemTrans : []});

      }else{
        // si el valor seleccionado no es nulo se inicializan los valores
        this.setState({arrivalHotel: val.value, arrivalHotelName:val.label, arrivalHotelpkId : val.pkHotelID, arrivalHotelClub : val.ynRRclub});
        // se jala la info de acuerdo a la seleccion del hotel
        var transType = this.state.transferType;// se carga el tipo de transfer seleccionad
        var pass = this.state.passengers;// se carga el numero de pasajeros de acuerdo al state
        var departureHotel = this.state.departureHotel;// se carga el departure hotel

        if(!this.state.roundTripType){// si el tipod e transfer NO es de round trip
          departureHotel = val.value;// el mismo valor de arrival se le agregar al departure
          this.setState({departureHotel: val.value, departureHotelName:val.label, departureHotelpkId : val.pkHotelID, departureHotelClub : val.ynRRclub});//se agregan los datos de arrival al de departure
        }else if(departureHotel==""){
          this.setState({departureHotel: val.value, departureHotelName:val.label, departureHotelpkId : val.pkHotelID, departureHotelClub : val.ynRRclub});//se agregan los datos de arrival al de departure
        }
        this.setValuesForHotelId();
        if(pass>0 && departureHotel!=""){//se verifica que los valores no lleguen vacios

          this.setState({loadingData : true});// se notifica que se estan cargando datos
          //se hace peticion de los items al web service
          this.props.eventos(transType,val.value,departureHotel,pass);

          this.selectedDate.setState({ expanded : true, focused: true});// se solicita al control de fecha abrir el control para que el usuario seleccione un dato
        }else{// si la info de pasajeros y la de departure no esta completa

            if(this.state.roundTripType){// si el tipo de transfer es de roundtrip
              // se solicita que se seleccione el departure hotel
              this.selectedHotelD.focus();// focusea
              this.selectedHotelD.setState({isOpen:true});// se le notifica a su state que abra el componente (aunque el mismo focus lo haga)
            }else if(pass==0){// si el transfer NO es roundtrip y el numero de pasajeros es 0
              // se solicita al usuario que seleccione el numero de pasajeros
              this.selectedPeople.focus();// focusea
              this.selectedPeople.setState({isOpen:true});// se le notifica al state que abra el control
            }

        }

      }
    }
    // function for selected departure hotel
    selectDH(val){
      var that =this;// contexto de la aplicacion
      if(val==null){
        //si el valor seleccionado es null se borran los valores del hotel
        this.setState({departureHotel: "", departureHotelName:"", departureHotelpkId : "" ,departureHotelClub : false ,itemTrans : []});
      }else{
        // si el valor seleccionado no es nulo se inicializan los valores
        this.setState({departureHotel: val.value, departureHotelName:val.label, departureHotelpkId : val.pkHotelID, departureHotelClub : val.ynRRclub });
        // se jala la info de acuerdo a la seleccion del hotel
        var transType = this.state.transferType;// se carga el tipo de transfer
        var pass = parseInt(this.state.passengers);// se carga el numero de pasajeros
        this.setValuesForHotelId();
        if(pass>0 && this.state.arrivalHotel!=""){// si el numero de psajeros es mayor a cero y existe informacion en el arrivalHotel del state

          this.setState({loadingData : true});// se notifica a la aplicacion que se estan cargando datos
          //
          this.props.eventos(transType,this.state.arrivalHotel,val.value,pass);
          this.selectedDate.setState({ expanded : true, focused: true});// se solicita al control de fecha abrir el control para que el usuario seleccione un dato

        }else{// si la info de pasajeros y la de arrival no esta completa
          if(this.state.arrivalHotel==""){// si la info de arrival esta vacia
            this.setState({arrivalHotel: val.value, arrivalHotelName:val.label, arrivalHotelpkId: val.pkHotelID, arrivalHotelClub : val.ynRRclub  }); // se agrega la misma info de departure a la de arrival
          }
          if(pass==0){// si el numero de pasajeros es 0
            this.selectedPeople.focus();// focusea
            this.selectedPeople.setState({isOpen:true});// se abre el control
          }
        }
      }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        if(nextProps.itemTrans.length > 0){
          this.setState({loadingData : false ,isOpenData : true});// se notifica que ya no se esta cargando informacion asi como se habre el wrapper de los datos encontrados
        }
    }
    datefieldIn(date){
      // calendario de salida
      // handler de seleccion de fecha  que seta el min del control de departure
      // la fecha seleccionada se anexa al arrival date y se actualiza la info del departure date
      var fecha = moment(date,"YYYY-MM-DD");
      if(fecha  >=  moment(this.state.departureDate,"YYYY-MM-DD")){
        this.setState({minDateOut : fecha ,
          arrivalDate : fecha.format("YYYY-MM-DD") });
          var fecha2 =  fecha;
          fecha2 = fecha2.add(1,'days');
          this.setState({ departureDate : fecha2.format("YYYY-MM-DD"), minDateOut : fecha2.format("YYYY-MM-DD") });
      }else{
        var fecha2 =  moment(date,"YYYY-MM-DD");
        fecha2 = fecha2.add(1,'days');
        this.setState({minDateOut : fecha2 ,
          arrivalDate : fecha.format("YYYY-MM-DD") });
      }
      //abrir el segundo date si el tipo de transfer es ==ROUNDTRIP
      if(this.state.transferType==this.state.idTransRoundtrip){
        this.selectedDate2.setState({ expanded : true, focused: true});
      }
    }
    datefieldOut(date){
      // calendario de regreso
      // handler de seleccion de fecha  que seta el min del control de departure
      var fecha = moment(date,"YYYY-MM-DD");
      if(fecha  >=  moment(this.state.arrivalDate,"YYYY-MM-DD")){
        this.setState({
          departureDate : fecha.format("YYYY-MM-DD") });
      }else{
        this.setState({
          departureDate : fecha.format("YYYY-MM-DD") });
      }
    }
    onAddressChanged(e) {// funcion que se ejecuta en al cambiar entre arrival y departure en los radio buttons
      this.setState({
              arrivalHotel:'',
              arrivalHotelName:'',
              arrivalHotelpkId:'',
              departureHotel:'',
              departureHotelName:'',
              departureHotelpkId:'',
              itemTrans : [],
              loadingData : false,
              isOpenData : false,});
      this.setState({transferType: e.currentTarget.value}); // se agrega el valor del componente al estado ( valor dinamico de acuerdo al servicio )
      this.setState({roundTripType: false});// se cambia el control global que especifica que no es roundtrip a todo el componente y childs
    }
    columnaOne(){
      //se especifican las clases que se van a renderizar
      var OneWay =`side type ${this.state.roundTripType?"oneway":""}`;
      //se especifican las clases que se van a renderizar
      var RoundTrip =`book-form-inputField date date`;

      if(!this.state.roundTripType){//[Renderizado] si el tipo de servicio NO es roundtrip
        let departure;
        if(this.props.departure){//condicional para imprimir o no departure type
          departure = (
            <p>
              <input name="group1" type="radio"  onChange={this.onAddressChanged} value={this.state.idTransDeparture} id="test2" />
              <label >Hotel - Airport</label>
            </p>
          );
        }
        //validacion del texto que indica si se muestra Arrival Date o Departure Date
        var  textDate = "Arrival Date";
        // this.state.transferType es el dato real del transfer seleccionado
        // this.state.idTransDeparture es el valor de la configuracion asignado a tipo departure
        if(this.state.transferType == this.state.idTransDeparture){// verificamos que el servicio seleccionado sea departure e imprimimos el texto corrrespondiente
          textDate = "Departure Date";
        }

        return(
        <div>
          <div className="book-form-inputField oneWay">
            <div className={OneWay}>
              <p>
                <input defaultChecked name="group1"  onChange={this.onAddressChanged} type="radio" value={this.state.idTransArrival} id="test1" />
                <label>Airport - Hotel</label>
              </p>
              { departure }
            </div>
          </div>
          <div className={RoundTrip}>
              <label>{textDate}</label>
              <DateField
                forceValidDate
                dateFormat={this.state.formato}
                showClock={false}
                updateOnDateClick={true}
                collapseOnDateClick={true}
                value={this.state.arrivalDate}
                footer={false}
                minDate={this.state.minDate}
                ref={i=>this.selectedDate=i}
              >
                  <DatePicker
                    onChange={this.datefieldIn}
                    style={{padding: 10}}
                    ref="checkinDate"
                    navigation={true}
                    locale="en"
                    forceValidDate={true}
                    highlightWeekends={true}
                    highlightToday={false}
                    weekNumbers={true}
                    weekStartDay={0}
                    weekNumbers={false}
                    />
            </DateField>
          </div>
        </div>
        )
      }else{ //[Renderizado] si el servicio es roundtrip
        return(
        <div>
          <div className="book-form-inputField hotel ">
            <label>Arrival Hotel</label>
            <Select
                ref={i=>this.selectedHotelA=i}
                name="AH"
                autoFocus={true}
                openOnFocus={true}
                value={this.state.arrivalHotel}
                options={this.props.hoteles}
                onChange={this.selectAH}
                placeholder="Choose your hotel"
                children = {(props) => <Select ref="controlArrival" {...props} /> }
            />
          </div>
          <div className="book-form-inputField hotel ">
            <label>Departure Hotel</label>
            <Select
                ref={i=>this.selectedHotelD=i}
                name="AH"
                autoFocus={true}
                openOnFocus={true}
                value={this.state.departureHotel}
                options={this.props.hoteles}
                onChange={this.selectDH}
                placeholder="Choose your hotel"
                children = {(props) => <Select ref="controlDeparture" {...props} /> }
            />
          </div>
        </div>
        )
      }
    }
    columnaTwo(){ // componentes de la segunda columna
        // renderisado de las clases
        var OneWay =`side type ${this.state.roundTripType?"oneway":""}`;
        var RoundTrip =`book-form-inputField date date`;
        //[Renderizado] si el tipo de servicio NO es roundtrip
        if(!this.state.roundTripType){
          return(
          <div>
            <div className="book-form-inputField hotel ">
              <label>Choose your hotel</label>
              <Select
                  ref={i=>this.selectedHotelA=i}
                  name="AH"
                  value={this.state.arrivalHotel}
                  options={this.props.hoteles}
                  onChange={this.selectAH}
                  placeholder="Choose your hotel"
                  children = {(props) => <Select ref="controlArrival" {...props} /> }
              />
            </div>
            <div className="book-form-inputField people">
                <label>No. of passengers</label>
                <Select
                    ref={i=>this.selectedPeople=i}
                    name="SP"
                    value={this.state.passengers}
                    options={this.state.optionsPeople}
                    onChange={this.selectPeople}
                />
            </div>
          </div>
          )
        }else{//[Renderizado] si el tipo de servicio es roundtrip
          return(
          <div>
          <div className={RoundTrip}>
              <label>Arrival Date</label>
                <DateField
                  forceValidDate
                  dateFormat={this.state.formato}
                  showClock={false}
                  updateOnDateClick={true}
                  collapseOnDateClick={true}
                  value={this.state.arrivalDate}
                  footer={false}
                  minDate={this.state.minDate}
                  ref={i=>this.selectedDate=i}
                >
                    <DatePicker
                      onChange={this.datefieldIn}
                      style={{padding: 10}}
                      ref="checkinDate"
                      navigation={true}
                      locale="en"
                      forceValidDate={true}
                      highlightWeekends={true}
                      highlightToday={false}
                      weekNumbers={true}
                      weekStartDay={0}
                      weekNumbers={false}
                      />
              </DateField>
          </div>
            <div className="book-form-inputField date ">
              <label>Departure Date</label>
            <DateField
              forceValidDate
              dateFormat={this.state.formato}
              showClock={false}
              updateOnDateClick={true}
              collapseOnDateClick={true}
              value={this.state.departureDate}
              footer={false}
              minDate={this.state.minDateOut}
              ref={i=>this.selectedDate2=i}>
                  <DatePicker
                    onChange={this.datefieldOut}
                    style={{padding: 10}}
                    navigation={true}
                    locale="en"
                    forceValidDate={true}
                    highlightWeekends={true}
                    highlightToday={false}
                    weekNumbers={false}
                    weekStartDay={0}/>
            </DateField>
            </div>
          </div>
          )
        }
      }
      columnaThree(){
          // clases que se van a renderisar
          var OneWay =`side type ${this.state.roundTripType?"oneway":""}`;
          var RoundTrip =`book-form-inputField date date`;

          if(this.state.roundTripType){//[Renderizado] si el tipo de servicio NO es roundtrip
            return(
              <div>
              <div className="book-form-inputField people">
                <div className="side">
                  <label>No. of passengers</label>
                  <Select
                      ref={i=>this.selectedPeople=i}
                      name="SP"
                      value={this.state.passengers}
                      options={this.state.optionsPeople}
                      onChange={this.selectPeople}
                  />
                </div>
              </div>
              <div className="book-form-inputField politica">

              </div>
            </div>
            );
          }else{//[Renderizado] si el tipo de servicio es roundtrip
          return(
            <div>
              <div className="book-form-inputField btnBook">

              </div>
              <div className="book-form-inputField politica">

              </div>
            </div>
            )
          }
        }
        openResultsData(){//funcion para abrir y cerrar la seccion de items encontrados de acuerdo a la busqueda
          this.setState({isOpenData : !this.state.isOpenData });
        }
        textResult(){// label que muestra el resultado de la busqueda de acuerdo a los parametros selecciconados
          if(this.props.itemTrans.length>0){// si los items son mayores a cero significa que hubo una respuesta por parte del web service
            if(this.state.loadingData){// si aun esta en busqueda se muetsra el texto LOading ....
                return "Loading...";
            }else if(!this.state.loadingData && this.props.itemTrans.length>0){// si ya no se esta cargando la info y el numero de items es mayor a cero se muestran el numero de resultados

                return this.props.itemTrans.length - 1 + " transfers were found"  ;
            }
          }else {// si los items de inicio son menores a cero significa que o no se han solcitado informacion o se esta cargando la informacion
            if(this.state.loadingData){// cargando datos
                return "Loading...";
            }else{// no hay informacion solicitada
                return "";
            }
          }
        }
      clear(){
        this.setState({
          arrivalHotel:'',
          loadingData : false,
          isOpenData : false,
          departureHotel:'',
          departureHotelName:'',
          departureHotelpkId:'',
          passengers : '0'
          });
          this.props.clearSearch();
      }
      nextStep(total,e){// funcion para guardar en cookies la info seleccionada por el usuario asi como mandar a la seccion de llenado de datos del usuario
        let that = this;
        var codeTrans = e.currentTarget.value;// el boton guardar el codigo de trans
        var obj = {};// en este objeto se almacenan los datos seleccionados a travez del componente
        obj['codeTrans'] = codeTrans;
        obj['itemTrans'] = {result : 1, data :total };
        obj['total'] = parseFloat(total.TotalPriceUSD).toFixed(2);
        obj['arrivalDate'] = encodeURIComponent(this.state.arrivalDate);
        obj['passengers'] = encodeURIComponent(this.state.passengers);
        obj['arrivalHotel'] = encodeURIComponent(this.state.arrivalHotel);
        obj['arrivalHotelName'] = this.state.arrivalHotelName;
        obj['arrivalHotelpkId'] = this.state.arrivalHotelpkId;
        obj['arrivalHotelClub'] = this.state.arrivalHotelClub;
        obj['transferType'] = encodeURIComponent(this.state.transferType);
        if(this.state.roundTripType){// si el servicio es roundtrip se guarda el dato real del hotel departure
          obj['departureDate'] = encodeURIComponent(this.state.departureDate);
          obj['departureHotel'] = encodeURIComponent(this.state.departureHotel);
          obj['departureHotelName'] = this.state.departureHotelName;
          obj['departureHotelpkId'] = this.state.departureHotelpkId;
          obj['departureHotelClub'] = this.state.departureHotelClub;
        }else{// si el servicio no es roundtrip se sobrescribe el departure hotel con los datos del arrival hotel
          obj['departureDate'] = encodeURIComponent(this.state.arrivalDate);
          obj['departureHotel'] = encodeURIComponent(this.state.arrivalHotel);
          obj['departureHotelName'] = this.state.arrivalHotelName;
          obj['departureHotelpkId'] = this.state.arrivalHotelpkId;
          obj['departureHotelClub'] = this.state.arrivalHotelClub;
        }


        this.props.setItemsCart(obj);

        let cartItems = document.getElementById('cart-items');

        contTemp = <CardNotification clasesShow={clasesShow} moveOut={{left : cartItems.offsetLeft + "px", top : cartItems.offsetTop + "px",right :" initial " }} style={{top:(window.innerHeight / 2) - 200 + "px",left : (window.innerWidth / 2) - 150 + "px"}} />;

        setTimeout(()=>{
          that.setState({
            arrivalHotel:'',
            loadingData : false,
            isOpenData : false,
            departureHotel:'',
            //departureHotelName:'',
            //departureHotelpkId:'',
            passengers : '0'
            });
            that.props.clearSearch();
        },1500);

      }
      render(){
        // clases css que se van a renderisar de acuerdo al estado de la aplicacion
        var btnArrival =`btn ${this.state.roundTripType?"":"active"}`;
        var btnRoundTrip =`btn ${this.state.roundTripType?"active":""}`;
        var resultWrap =`results ${!this.state.loadingData && Object.keys(this.props.itemTrans).length>0 && this.state.isOpenData?"active":""}`;
        let clearSearch;
        if(Object.keys(this.props.itemTrans).length>0){
        //if(true){
          clearSearch = <div onClick={this.clear} className="shapes icon-close small after-red before-red"></div>;
        }else{
          contTemp = "";
        }
        return(
          <div className="wrap-book" ref={i=>this.formulario = i}>
            {contTemp}
            <div className="book">
              <div className="book-title">
                  <h1 >Transfer type</h1>
                  <div className="left">
                    <button onClick={this.handleToggleS} className={btnArrival} ><i className="material-icons">flight_land</i>One Way</button>
                    <button onClick={this.handleToggleR} className={btnRoundTrip} ><i className="material-icons">sync</i> Round Trip</button>
                  </div>
                  <div className="right">
                    {clearSearch}
                  </div>
              </div>
              <div className="book-form">
                <div className="column">
                  {this.columnaOne()}
                </div>
                <div className="column">
                  {this.columnaTwo()}
                </div>
                <div className="column">
                  {this.columnaThree()}
                </div>
              </div>
          </div>
          <div className="wrap-results">
            <div className="load-results">
                <p>{this.textResult()}</p><i onClick={this.openResultsData}  className="material-icons">arrow_drop_down</i>
            </div>
            <div className={resultWrap}>
                <ListItems evento={this.nextStep} passengers={this.state.passengers}  dataItems={this.props.itemTrans} />
            </div>
          </div>
        </div>
        );
      }
}


export default Formulario;
