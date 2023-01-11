import Image from "next/image";
import Link from "next/link";
import { Paper, Text } from "@mantine/core";
import { useNetwork } from "wagmi";
import { Player } from "@livepeer/react";

import type { Post } from "@/services/upload";
import { Chain } from "wagmi";

const PostCard = (post: Post) => {
  const { chain } = useNetwork();
  let y, x;

  function checkType(id: string | undefined) {
    if (id && id.slice(-1) === "4") {
      return true;
    }
    return false;
  }

  if (post.image.charAt(0) === "i") {
    y = post.image.replace("ipfs://", "");
    x = y.replace("/", ".ipfs.dweb.link/");
  }

  function loadPosts(chain: Chain) {
    if ([56, 250, 80001].includes(chain.id)) {
      return chain.network as string;
    }
    return "fantom";
  }

  const imgSrc = `https://${x ?? "evm.pinsave.app/PinSaveCard.png"}`;

  return (
    <Link href={`/${loadPosts(chain as Chain)}/posts/${post.token_id}`}>
      <Paper
        component="div"
        withBorder
        radius="lg"
        shadow="md"
        p="md"
        sx={{ cursor: "pointer" }}
      >
        <div
          style={{
            position: "relative",
            height: 200,
          }}
        >
          {checkType(post.image) === false ? (
            <Image
              src={imgSrc}
              alt={post.name}
              placeholder="blur"
              fill
              blurDataURL={imgSrc}
              sizes="200px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Player
              src={post.image}
              muted
              autoUrlUpload={{
                fallback: true,
                ipfsGateway: "https://w3s.link",
              }}
              aspectRatio="1to1"
            />
          )}
        </div>
        <Text align="center" mt="sm">
          {post.name}
        </Text>
      </Paper>
    </Link>
  );
};

export default PostCard;
