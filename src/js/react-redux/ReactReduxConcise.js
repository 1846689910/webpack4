import React from "react";
import {connect} from "react-redux";
import {ActionTypes, Action} from "../Store";
import {Link} from "react-router-dom";

/**
 * Counter is a presentational component(pc)
 * pc (for UI only, no state mgmt, all data from props, no redux api)
 * */
const CounterPC = (props) => {
    return (
        <div>
            <p style={{textAlign: "center"}}><b><i>React-Redux Display</i></b></p>
            <div style={{padding: 0}}>
                <h3 style={{textAlign: "center"}}>{props.value}</h3>
                <div style={{textAlign: "center"}}>
                    <button className="btn btn-success" onClick={props.increase}>increase</button>
                    <button className="btn btn-danger" onClick={props.decrease}>decrease</button>
                    <Link to="/"><button className="btn btn-primary">to /</button></Link>
                </div>
            </div>
        </div>
    );
};

/**
 * mapStateToProps: 建立state到内部pc组件的联系，使得内部PC组件可以拿到更新的state和props
 * */
const mapStateToProps = (state, props) => {
    return {
        value: state.value  // 连接CounterPC的属性value到state的value属性
    };
};

/**
 * mapDispatchToProps: 建立dispatch方法到props的连接，使得内部PC组件可以向外发送
 * 写法1(推荐)：作为函数 => 返回对象，每个键值对都会返回一个函数，内部发送Action
 * */
const mapDispatchToProps1 = (dispatch, props) => {
    return {
        increase: () => dispatch(Action(ActionTypes.INCREASE)),
        decrease: () => dispatch(Action(ActionTypes.DECREASE))
    };
};
/**
 * 写法2：作为object, 每个键值对都会返回一个函数，内部返回一个Action
 * */
const mapDispatchToProps2 = {
    increase: () => Action(ActionTypes.INCREASE),
    decrease: () => Action(ActionTypes.DECREASE)
};


/**
 * CounterCC is CounterPC's container component(cc)
 * cc (manage state and logic, no UI, use redux api)
 * 如果CounterCC没有传入mapStateToProps和mapDispatchToProps的话，那么内部的PC组件不会及时地刷新UI
 * */
const CounterCC = connect(
    mapStateToProps,
    mapDispatchToProps2
)(CounterPC);


const ReactReduxConcise = () => {
    return (
        <div>
            <CounterCC />
        </div>
    );
};

export default ReactReduxConcise;
