import { Test, TestingModule } from "@nestjs/testing";
import { ProcessadorService } from "./processador.service";

describe("ProcessadorService", () => {
  let service: ProcessadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessadorService],
    }).compile();

    service = module.get<ProcessadorService>(ProcessadorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
