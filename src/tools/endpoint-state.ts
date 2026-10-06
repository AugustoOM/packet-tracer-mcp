import { z } from "zod";
import type { ToolModule } from "./types.js";
import { ipv4, nativeCall, makeGuard } from "./integration-common.js";
import { readEndpointJs } from "../ipc/endpoint-state.js";
const device = z.string().min(1);
export const registerEndpointStateTool: ToolModule = ({bridge,server}) => {
  const guard = makeGuard(bridge);
  server.tool("pt_read_endpoint", "Read actual endpoint interface IP, mask, DHCP flag and link; use ipconfig /all for gateway/DNS on devices without native getters.",{device},async a=>guard(()=>nativeCall(bridge,readEndpointJs(a.device))));

};
