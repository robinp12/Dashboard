<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"case_read"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CaseNumberRepository")
 */
class CaseNumber
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"case_read","hospital_read","users_read"})
     * 
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Hospital", inversedBy="caseNumber", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"case_read"})
     * 
     */
    private $hospital;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"case_read","hospital_read","users_read"})
     * 
     */
    private $caseNumber;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHospital(): ?Hospital
    {
        return $this->hospital;
    }

    public function setHospital(Hospital $hospital): self
    {
        $this->hospital = $hospital;

        return $this;
    }

    public function getCaseNumber(): ?int
    {
        return $this->caseNumber;
    }

    public function setCaseNumber(?int $caseNumber): self
    {
        $this->caseNumber = $caseNumber;

        return $this;
    }
}
