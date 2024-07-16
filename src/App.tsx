import { PageHeader } from "./layouts/PageHeader";

export default function App(){
  //take entire screen sixe (100vh) and flex direction is column
  return <div className="max-h-screen flex flex-col"> 
  <PageHeader/>
  <div>2</div>
  </div>
}