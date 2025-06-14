import { db } from "@/libs/db";
import { Request, Response, Router } from "express";
import { UpdateUserDto } from "../../dto/user.dto";
import { validateRequest } from "../../middlewares/validator";

const userRouter = Router();

// 사용자 업데이트 라우트
userRouter.put(
  "/:id",
  validateRequest(UpdateUserDto), // 부분 업데이트를 위해 skipMissingProperties: true
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nickname, email, password } = req.body; // req.body는 이제 UpdateUserDto 인스턴스입니다.

    try {
      const updatedUser = await db.user.update({
        where: { id: parseInt(id) },
        data: {
          nickname,
          email,
          password,
        },
      });
      // 민감한 정보(비밀번호)는 응답에서 제외
      const { password: _, ...result } = updatedUser;
      res.status(200).json(result);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "해당 ID의 사용자를 찾을 수 없습니다." });
      }
      if (error.code === "P2002" && error.meta?.target) {
        const target = error.meta.target.includes("email") ? "이메일" : "닉네임";
        return res.status(409).json({ message: `${target}이(가) 이미 사용 중입니다.` });
      }
      console.error("사용자 업데이트 오류:", error);
      res.status(500).json({ message: "사용자 업데이트에 실패했습니다." });
    }
  }
);

// 사용자 삭제 라우트
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No Content
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "해당 ID의 사용자를 찾을 수 없습니다." });
    }
    console.error("사용자 삭제 오류:", error);
    res.status(500).json({ message: "사용자 삭제에 실패했습니다." });
  }
});

// 모든 사용자 조회 라우트
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: {
        // 비밀번호 제외
        id: true,
        nickname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("모든 사용자 조회 오류:", error);
    res.status(500).json({ message: "사용자 조회에 실패했습니다." });
  }
});

// 특정 사용자 조회 라우트
userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        // 비밀번호 제외
        id: true,
        nickname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "해당 ID의 사용자를 찾을 수 없습니다." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("특정 사용자 조회 오류:", error);
    res.status(500).json({ message: "사용자 조회에 실패했습니다." });
  }
});

export { userRouter };
